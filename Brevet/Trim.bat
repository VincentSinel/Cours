
%%~d1
CD "%%~p1"
FOR %%a in (*.png) DO (magick mogrify "%%a" -trim +repage "%%a")
PAUSE