export default function Inicio() {




    return (

        <>
            <h1>Bienvenido {sessionStorage.getItem('NombreUsuario')} </h1>
            <br />
            <h1>Lista de Usuarios</h1>
        </>

    );


}