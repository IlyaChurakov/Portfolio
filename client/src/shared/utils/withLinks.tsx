import React from 'react'

export function WithLinks({
	text,
	linkStyles,
}: {
	text: string | undefined | null
	linkStyles?: React.CSSProperties
}) {
	if (!text) return null

	const linkRegex = /(\[[^\]]+\])/g

	const textParts: string[] = text.split(linkRegex)

	const linkedText = textParts.map((item, index) => {
		if (linkRegex.test(item)) {
			const clearTextWithSpaces = item.replace(/\[|\]/g, '')
			const clearText = clearTextWithSpaces.replace(/\s/g, '')

			const url = `https://${clearText.toLowerCase()}`
			const prettyLinkText = clearTextWithSpaces.replace(/\.\w+$/g, '')

			return (
				<a key={item + index} href={url} target='_blank' style={linkStyles}>
					{prettyLinkText}
				</a>
			)
		} else return item
	})

	return <>{...linkedText}</>
}
