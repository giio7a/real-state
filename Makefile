build-all:
	npm run ng build -- --project=@nidiro/ngx-map-core
	npm run ng build -- --project=@nidiro/ngx-map-isochrone-layer
	npm run ng build -- --project=@nidiro/ngx-map-weather-layer
	npm run ng build -- --project=siena --configuration=production
