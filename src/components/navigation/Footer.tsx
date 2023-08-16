import nav from './nav.module.scss';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <div className={nav.footer}>
            <div className={nav.footer_container}>
                <span className={nav.footer_project}>
                    SEDA LOCKER
                </span>
                <span className={nav.footer_author}>
                    gh:thezoot3
                </span>
            </div>
            <div className={nav.footer_container}>
                <span className={nav.footer_osl}>
                    Open Source License
                </span>
            </div>
            </div>
    )
}
export default Footer;