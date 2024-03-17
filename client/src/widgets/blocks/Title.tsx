const Title = ({
	text = '',
	color = '#fff',
}: {
	text: string
	color?: string
}) => {
	return (
		<h1 className={`text-4xl font-bold my-5`} style={{ color }}>
			{text}
		</h1>
	)
}

export default Title
