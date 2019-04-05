all:
	bundle exec jekyll serve --host 0.0.0.0

images:
	mogrify -strip -resize '660x660>' assets/organizers/*.png