import { Logo } from './logo'
import { Navigation } from './navigation'
import { UserActions } from './user-actions'

export const Header = () => {
  return (
    <header className="w-full h-16">
      <div className="h-full w-full flex items-center justify-between px-4">
        <div className="w-1/3 flex">
          <Logo />
        </div>
        <div className="w-1/3 flex justify-center">
          <Navigation />
        </div>
        <div className="w-1/3 flex justify-end">
          <UserActions />
        </div>
      </div>
    </header>
  )
}
