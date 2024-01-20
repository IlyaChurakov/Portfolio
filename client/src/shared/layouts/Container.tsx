import { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
}

const Container: FC<Props> = ({ children }) => {
	return <div className='max-w-[1200px] m-auto'>{children}</div>
}

export default Container
