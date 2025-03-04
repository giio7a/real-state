build-all:
	nx build @nidiro/ngx-map-core
	nx build @nidiro/ngx-map-isochrone-layer
	nx build @nidiro/ngx-map-weather-layer
	nx build siena --configuration=production
