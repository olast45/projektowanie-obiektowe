from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("http://localhost:5173")


# 1. REQUIRED FIELDS
driver.find_element(By.TAG_NAME, "button").click()
time.sleep(1)

assert "required" in driver.page_source.lower()


# 2. INVALID EMAIL FORMAT
driver.find_element(By.NAME, "name").send_keys("Jan")
driver.find_element(By.NAME, "email").send_keys("bad-email")
driver.find_element(By.NAME, "password").send_keys("123456")

driver.find_element(By.TAG_NAME, "button").click()
time.sleep(1)

assert "invalid email" in driver.page_source.lower()


# 3. VALID FORM SUBMISSION
email = driver.find_element(By.NAME, "email")
email.clear()
email.send_keys("jan@test.com")

driver.find_element(By.TAG_NAME, "button").click()
time.sleep(1)

assert "successfully" in driver.page_source.lower()


# 4. XSS IN NAME FIELD
driver.get("http://localhost:5173")

driver.find_element(By.NAME, "name").send_keys("<script>window.xss=true</script>")
driver.find_element(By.NAME, "email").send_keys("jan@test.com")
driver.find_element(By.NAME, "password").send_keys("secret123")

driver.find_element(By.TAG_NAME, "button").click()
time.sleep(1)

xss_executed = driver.execute_script("return window.xss === true")

assert xss_executed is not True


# 5. XSS IN EMAIL FIELD
driver.get("http://localhost:5173")

driver.find_element(By.NAME, "name").send_keys("Jan")
driver.find_element(By.NAME, "email").send_keys("<img src=x onerror=alert(1)>")
driver.find_element(By.NAME, "password").send_keys("secret123")

driver.find_element(By.TAG_NAME, "button").click()
time.sleep(1)

page = driver.page_source.lower()

assert "onerror" in page or "invalid email" in page


driver.quit()