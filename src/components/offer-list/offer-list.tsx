import { memo } from 'react';
import { Offer, OfferHover } from '../../data/types/offer';
import CityCard from '../city-card/city-card';

const IMAGE_WIDTH = 260;
const IMAGE_HEIGHT = 200;

type Props = {
    offers: Offer[];
    onOfferHover: OfferHover | undefined;

  }

function OfferList({offers, onOfferHover }: Props) : JSX.Element{
  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.map(
        (offerItem) => (
          <CityCard onOfferHover={onOfferHover}
            key={offerItem.id}
            offer={offerItem}
            baseClass={'cities'}
            imageSize={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT
            }}
          />
        )
      )};
    </div>
  );
}


export default memo(OfferList);
