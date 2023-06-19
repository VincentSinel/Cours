@ECHO OFF
SETLOCAL DisableDelayedExpansion
SET "r=%__CD__%"
CD . > E:\Onedrive\Prog\Website\Cours\Brevet\ListeImage.txt
FOR /R . %%F IN (*.png) DO (
  SET "p=%%F"
  SETLOCAL EnableDelayedExpansion
  ECHO !p:%r%=! >> E:\Onedrive\Prog\Website\Cours\Brevet\ListeImage.txt
  ENDLOCAL
) 