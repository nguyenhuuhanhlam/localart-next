import { Container } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PaintingCard, InformationIndication } from './'
import styles from '../styles/PaintingListInfinite.module.scss'

const PaintingListInfinite = ({ items,next,hasMore,itemOnClick }) =>
{
	return (
		<InfiniteScroll
			dataLength={items.length}
			next={next}
			hasMore={hasMore}
			loader={ <InformationIndication text="Loading..." iconName="bi-hourglass" /> }
			endMessage={ <InformationIndication text="" iconName="bi-arrow-bar-up" /> }
		>
			<Container className={`d-flex flex-wrap justify-content-between p-0 ${styles.layout}`}>
			{
				items.map((v,k)=>{
					return <PaintingCard key={k} item={v} itemOnClick={()=>itemOnClick(v)} />
				})
			}
			</Container>
		</InfiniteScroll>
	)
}

export default PaintingListInfinite