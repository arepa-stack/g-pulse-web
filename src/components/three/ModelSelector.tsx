import { MODELS } from '../../config/models'
import { GymModel } from './GymModel'

/** Instantiates every configured machine. Selection state lives in the store. */
export function ModelSelector() {
  return (
    <>
      {MODELS.map((model) => (
        <GymModel key={model.id} model={model} />
      ))}
    </>
  )
}
