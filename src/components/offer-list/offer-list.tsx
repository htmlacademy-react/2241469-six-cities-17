import { Offer, OfferClick, OfferHover } from '../../data/types/offer';
import CityCard from '../city-card/city-card';


type Props = {
    offers: Offer[];
    onOfferHover: OfferHover | undefined;
    onOfferClick: OfferClick;
  }

function OfferCardsList({offers, onOfferHover ,onOfferClick}: Props) : JSX.Element{
  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.map(
        (offerItem) => (
          <CityCard onOfferHover={onOfferHover} onOfferClick={onOfferClick}
            key={offerItem.id}
            offer={offerItem}
            baseClass={'cities'}
            imageSize={{
              width: '260',
              height: '200'
            }}
          />
        )
      )};
    </div>
  );
}


export default OfferCardsList;
