import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
	return (
		<div className={`max-w-[1100px] w-full m-auto flex flex-col`}>
			{children}
		</div>
	)
}

export default Container
