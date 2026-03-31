program NumbersGenerator;

uses crt;

type
  TNumbers = array[1..50] of Integer;

var
  Numbers: TNumbers;
  i: Integer;

procedure GenerateNumbers(var Table: TNumbers);
var
  i: Integer;
begin
  randomize; 
  for i := 1 to 50 do
    Table[i] := random(101);
end;

procedure SortNumbers(var Table: TNumbers);
var
  i, j, temp: Integer;
begin
  for i := 1 to 49 do
    for j := 1 to 50 - i do
      if Table[j] > Table[j + 1] then
      begin
        temp := Table[j];
        Table[j] := Table[j + 1];
        Table[j + 1] := temp;
      end;
end;

begin
  clrscr;
  
  writeln('Generating numbers...');
  GenerateNumbers(Numbers);

  writeln('Before sorting:');
  for i := 1 to 50 do
    write(Numbers[i], ' ');
    
  writeln;
  
  SortNumbers(Numbers);

  writeln('After sorting:');
  for i := 1 to 50 do
    write(Numbers[i], ' ');
    
  writeln;
end.