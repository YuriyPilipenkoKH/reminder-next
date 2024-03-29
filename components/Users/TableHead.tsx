import { RowWrap } from "./UserCard/UserCard.styled"


function TableHead() {
  return (
    <RowWrap className='RowWrap bg-gradient-to-r from-slate-500 to-slate-700 text-slate-100 font-semibold rounded-md '>
      <div>Name</div>
      <div>Email</div>
      <div>Phone</div>
      <div>Company</div>
      <div>Location</div>
    </RowWrap>
  )
}

export default TableHead
