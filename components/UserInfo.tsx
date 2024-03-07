

function UserInfo() {
  return (
    <div className="grid place-items-center h-screen ">
        <div className="shadow-lg p-8 bg-zinc-300 grid gap-4 rounded-lg">
          <div>Name:
            <span className="font-bold ">John</span>
          </div>
          <div>Email:
            <span className="font-bold ">John@mail</span>
          </div>
          <button className="bg-red-600/90 text-neutral-100 font-bold px-6 py-2 rounded-lg">LogOut</button>
        </div>

    </div>
  )
}

export default UserInfo
