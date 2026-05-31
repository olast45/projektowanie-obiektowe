from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("http://localhost:5173")

# 1
driver.find_element(By.TAG_NAME, "button").click()
time.sleep(1)

assert "required" in driver.page_source.lower()

# 2
driver.find_element(By.NAME, "name").send_keys("Jan")
driver.find_element(By.NAME, "email").send_keys("bad-email")
driver.find_element(By.NAME, "password").send_keys("123456")

driver.find_element(By.TAG_NAME, "button").click()
time.sleep(1)

assert "invalid email" in driver.page_source.lower()

# 3
email = driver.find_element(By.NAME, "email")
email.clear()
email.send_keys("jan@test.com")

driver.find_element(By.TAG_NAME, "button").click()
time.sleep(1)

assert "successfully" in driver.page_source.lower()

driver.quit()