@ECHO OFF
SETLOCAL DisableDelayedExpansion
SET "r=%__CD__%"
CD . > ListeImage.txt
FOR /R . %%F IN (*.png) DO (
  SET "p=%%F"
  SETLOCAL EnableDelayedExpansion
  ECHO !p:%r%=! >> ListeImage.txt
  ENDLOCAL
) 