import { useRouter } from 'next/router'
import { PaintingListInfinite } from '../../components'

const Paintings = ({ paintings }) =>
{
	const router = useRouter()

	return (
		<PaintingListInfinite
			items={paintings}
			itemOnClick={ e=>router.push(`/paintings/d/${e.id}`) }
		/>
	)
}

Paintings.getInitialProps = async () =>
{
	const res = await fetch('http://localhost:3000/api/get-paintings')
	const json = await res.json()
	return { paintings: json.paintings }
}

export default Paintings