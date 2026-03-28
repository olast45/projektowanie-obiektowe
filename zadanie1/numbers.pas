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
  begin
    Table[i] := random(101); 
  end;
end;

begin
  clrscr;
  
  writeln('Generating 50 numbers...');
  GenerateNumbers(Numbers);
  
  writeln('Numbers:');
  for i := 1 to 50 do
    write(Numbers[i], ' ');
    
  writeln;
end.