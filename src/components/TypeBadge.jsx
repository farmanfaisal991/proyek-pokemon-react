import typeStyles from '../typeStyles'

function TypeBadge(props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold uppercase text-white ${typeStyles[props.type].badge}`}
    >
      {props.type}
    </span>
  )
}

export default TypeBadge