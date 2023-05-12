
%%~d1
CD "%%~p1"
MD small
FOR %%a in (*.png) DO (magick mogrify "%%a" -trim +repage "%%a")
PAUSE