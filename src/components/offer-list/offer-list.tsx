import { Offer } from '../../data/types/offer';
import CityCard from '../city-card/city-card';


type props = {
    offers: Offer[];
    onHandleChangeActiveCard: (id: string | null)=>void;
  }

function OfferCardsList({offers, onHandleChangeActiveCard}: props) : JSX.Element{
  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.map(
        (offerItem) => <CityCard onHandleChangeActiveCard ={onHandleChangeActiveCard} key={offerItem.id} offer={offerItem}/>
      )};
    </div>
  );
}


export default OfferCardsList;
