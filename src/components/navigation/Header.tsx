import nav from './nav.module.scss';
function Header() {
    return (
        <div className={nav.header}>
            <span className={nav.header_icon}>lock_open</span>
            <span className={nav.header_title}>SEDA Locker</span>
        </div>
    )
}

export default Header;
