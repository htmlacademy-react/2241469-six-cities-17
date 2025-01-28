import 'leaflet/dist/leaflet.css';
import { Icon, layerGroup, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import { City, Offer } from '../../data/types/offer';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../data/const';


type MapProps = {
  city: City | null;
  offers: Offer[];
  currentOffer: Offer | undefined;
  baseClass: string;
  size?: {
    height?: number | string;
    width?: number | string;
  };
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});


function Map(props: MapProps): JSX.Element {
  const { city, offers, currentOffer, baseClass, size } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map && city) {
      map.flyTo(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon: defaultCustomIcon,
          }
        );

        marker.addTo(markerLayer);
      });

      if(currentOffer) {
        const marker = new Marker(
          {
            lat: currentOffer.location.latitude,
            lng: currentOffer.location.longitude,
          },
          {
            icon: currentCustomIcon
          }
        );
        marker.addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, currentOffer]);

  return <section className={`${baseClass}__map map`} style={size} ref={mapRef}></section>;

}


export default Map;
