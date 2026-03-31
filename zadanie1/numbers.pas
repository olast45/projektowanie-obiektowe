program NumbersGenerator;

uses crt;

type
  TNumbers = array[1..50] of Integer;

var
  Numbers: TNumbers;
  i, count, minVal, maxVal: Integer;

procedure GenerateNumbers(var Table: TNumbers; minVal, maxVal, count: Integer);
var
  i: Integer;
begin
  randomize;
  for i := 1 to count do
    Table[i] := random(maxVal - minVal + 1) + minVal;
end;

procedure SortNumbers(var Table: TNumbers; count: Integer);
var
  i, j, temp: Integer;
begin
  for i := 1 to count - 1 do
    for j := 1 to count - i do
      if Table[j] > Table[j + 1] then
      begin
        temp := Table[j];
        Table[j] := Table[j + 1];
        Table[j + 1] := temp;
      end;
end;

begin
  clrscr;

  write('Min value: ');
  readln(minVal);
  write('Max value: ');
  readln(maxVal);

  write('How many numbers (max 50): ');
  readln(count);

  writeln;

  if count > 50 then count := 50;
  if count < 1 then count := 1;

  if minVal > maxVal then
  begin
    writeln('Error: min value cannot be greater than max value.');
    readln;
    halt;
  end;

  GenerateNumbers(Numbers, minVal, maxVal, count);

  writeln('Before sorting:');
  for i := 1 to count do
    write(Numbers[i], ' ');

  writeln;

  SortNumbers(Numbers, count);

  writeln('After sorting:');
  for i := 1 to count do
    write(Numbers[i], ' ');

  writeln;
end.