import { useCountUp } from '../../hooks/useCountUp'
import styles from './StatCounter.module.css'

interface Props {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

export function StatCounter({ value, suffix = '', prefix = '', label }: Props) {
  const { ref, value: v } = useCountUp(value)
  return (
    <div className={styles.stat}>
      <div className={styles.number}>
        <span ref={ref} className="gradient-text">
          {prefix}
          {v.toLocaleString('es')}
          {suffix}
        </span>
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}
