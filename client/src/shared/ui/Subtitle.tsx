const Subtitle = ({
	text = '',
	color = '#fff',
}: {
	text: string
	color?: string
}) => {
	return (
		<h2 className={`text-3xl font-bold`} style={{ color }}>
			{text}
		</h2>
	)
}

export default Subtitle
