@ECHO OFF
SETLOCAL DisableDelayedExpansion
SET "r=%__CD__%"
CD . > C:\Users\Dell\OneDrive\Prog\Website\Cours\Brevet\ListeImage.txt
FOR /R . %%F IN (*.png) DO (
  SET "p=%%F"
  SETLOCAL EnableDelayedExpansion
  ECHO !p:%r%=! >> C:\Users\Dell\OneDrive\Prog\Website\Cours\Brevet\ListeImage.txt
  ENDLOCAL
) 