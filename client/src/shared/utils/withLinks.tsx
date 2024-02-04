import React from 'react'

export function WithLinks({
	text,
	linkStyles,
}: {
	text: string | undefined
	linkStyles?: React.CSSProperties
}) {
	if (!text) return null

	const linkRegex = /(\[.*?\]\(.*?\))/g

	const textParts: string[] = text.split(linkRegex)

	function transformStringToLink(item: string, index: number) {
		if (linkRegex.test(item)) {
			const textLink = item.match(/\[([^\]]+)\]/)
			const url = item.match(/\(([^)]+)\)/)

			if (!textLink || !url) return item

			return (
				<a key={item + index} href={url[1]} target='_blank' style={linkStyles}>
					{textLink[1]}
				</a>
			)
		} else return item
	}

	return (
		<>{textParts.map((item, index) => transformStringToLink(item, index))}</>
	)
}
