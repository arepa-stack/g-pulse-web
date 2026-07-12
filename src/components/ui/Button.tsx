import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import styles from './Button.module.css'

type Variant = 'primary' | 'ghost' | 'outline'

interface Props {
  variant?: Variant
  icon?: ReactNode
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  type?: 'button' | 'submit'
  'aria-label'?: string
}

/** Neon button. Renders an <a> when `href` is set, otherwise a <button>. */
export function Button({
  variant = 'primary',
  icon,
  children,
  onClick,
  href,
  className = '',
  type = 'button',
  ...aria
}: Props) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`
  const inner = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </>
  )
  const motionProps = { whileHover: { y: -2 }, whileTap: { scale: 0.97 } }

  if (href) {
    return (
      <motion.a href={href} className={cls} {...motionProps} {...aria}>
        {inner}
      </motion.a>
    )
  }
  return (
    <motion.button type={type} className={cls} onClick={onClick} {...motionProps} {...aria}>
      {inner}
    </motion.button>
  )
}
