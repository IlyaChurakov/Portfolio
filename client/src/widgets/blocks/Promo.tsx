import Subtitle from '../../shared/ui/Subtitle'
import Title from '../../shared/ui/Title'
import styles from './Promo.module.css'

const Promo = () => {
	return (
		<section>
			<div className='grid grid-cols-[1fr_0.8fr] items-center'>
				<div>
					<Title text='Илья Чураков' />
					<Subtitle text='Портфолио' color='#9255E8' />
					<Subtitle text='front-end' />
					<Subtitle text='разработчика' color='#9255E8' />
				</div>

				<div className='min-h-[600px] aspect-square relative'>
					<div className={styles.background} />
					<img
						src='me.png'
						alt='me'
						className='h-full absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 z-20'
					/>
				</div>
			</div>
		</section>
	)
}

export default Promo
