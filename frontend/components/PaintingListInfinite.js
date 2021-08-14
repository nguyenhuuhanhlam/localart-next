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
			<div className={styles.container}>
			{
				items.map((v,k) => <PaintingCard key={k} item={v} itemOnClick={()=>itemOnClick(v)} />)
			}
			</div>
		</InfiniteScroll>
	)
}

export default PaintingListInfinite