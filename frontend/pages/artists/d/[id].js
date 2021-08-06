import { useRouter } from 'next/router'

const ArtistDetail = () =>
{
	const router = useRouter()
	const { id } = router.query
	return 'Details : ' + id
}

export default ArtistDetail