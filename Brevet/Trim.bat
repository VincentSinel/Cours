::%~d1
::CD "%~p1"
@echo off    
for /R %%a in (*.png) do (
magick mogrify "%%a" -trim +repage "%%a"
echo %%a
)
PAUSE