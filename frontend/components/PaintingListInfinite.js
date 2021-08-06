import InfiniteScroll from 'react-infinite-scroll-component'
import { PaintingCard, InformationIndication } from './'

const PaintingListInfinite = ({ items,next,hasMore,itemOnClick }) =>
{
	return (
		<InfiniteScroll
			dataLength={items.length}
			next={next}
			hasMore={hasMore}
			loader={ <InformationIndication text="Loading..." iconName="bi-hourglass" /> }
			endMessage={ <InformationIndication text="End List." iconName="bi-arrow-bar-up" /> }
		>
			{
				items.map((v,k)=>{
					return <PaintingCard key={k} item={v} itemOnClick={()=>itemOnClick(v)} />
				})
			}
		</InfiniteScroll>
	)
}

export default PaintingListInfinite