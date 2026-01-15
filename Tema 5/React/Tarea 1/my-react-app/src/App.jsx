function App() {
const users = [
{ id: 1, name: 'Jose', role: 'Web Developer' },
{ id: 2, name: 'Estefanía', role: 'Web Designer' },
{ id: 3, name: 'Rubén', role: 'Team Leader' },
{ id: 4, name: 'Klara', role: 'Project Manager' },
{ id: 5, name: 'Miguel', role: 'Backend Developer' },
]
return (
<>
<p>Lista de usuarios activos:</p>
<ul>
{users.map(function (user) {
    const claseRol = user.role === 'Team Leader' ? 'estilo-leader' : 'estilo-staff';
    return (
        <li key={user.id} className={claseRol}>
        {user.name} — {user.role}
        </li>
    )
})}
</ul>
</>
)
}
export default App