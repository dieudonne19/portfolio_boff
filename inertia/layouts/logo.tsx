import { Link } from '@adonisjs/inertia/react'

export const Logo = () => {
  return (
    <div className="">
      <Link href="/">
        <h2 className="font-bold text-2xl">DIM.</h2>
      </Link>
    </div>
  )
}
