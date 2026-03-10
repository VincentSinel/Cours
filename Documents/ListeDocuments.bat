@ECHO OFF
SETLOCAL DisableDelayedExpansion
SET "r=%__CD__%"
CD . > ListeDocuments.txt
FOR /R ./Documents %%F IN (*.*) DO (
  SET "p=%%F"
  SETLOCAL EnableDelayedExpansion
  ECHO !p:%r%=! >> ListeDocuments.txt
  ENDLOCAL
)