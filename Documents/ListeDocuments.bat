@ECHO OFF
SETLOCAL DisableDelayedExpansion
SET "r=%__CD__%"
CD . > ListeDocuments.txt
FOR /R . %%F IN (*.pdf) DO (
  SET "p=%%F"
  SETLOCAL EnableDelayedExpansion
  ECHO !p:%r%=! >> ListeDocuments.txt
  ENDLOCAL
) 