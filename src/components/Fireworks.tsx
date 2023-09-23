import Particles from 'react-particles'
import type { Engine } from 'tsparticles-engine'
import { loadFireworksPreset } from 'tsparticles-preset-fireworks'

export default function Fireworks() {
  const options = {
    preset: 'fireworks',
  }
  // this customizes the component tsParticles installation
  async function customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadFireworksPreset(engine)
  }

  return <Particles options={options} init={customInit} />
}
