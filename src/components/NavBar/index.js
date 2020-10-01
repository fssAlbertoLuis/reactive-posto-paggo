import React from 'react';
import {connect} from 'react-redux';

import MobileNav from './mobileNav';
import {Hidden} from '@material-ui/core';
import DesktopNav from './DesktopNav';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import AutoRenewIcon from '@material-ui/icons/Autorenew';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.determineLinks();
  }

  determineLinks = () => {
    this.links = [
      {
        title: 'início',
        path: '/dashboard',
        icon: HomeIcon,
      }
    ];

    if (this.props.authState.user.info.permission === 'general-manager') {
      this.links.push({
        title: 'Recargas',
        icon: AutoRenewIcon,
        sublinks: [
          {
            title: 'Recarregar créditos',
            path: '/recharge/new'
          },
          {
            title: 'Lista de recargas',
            path: '/recharge/all',
          }
        ]
      });
    }
  
    this.links.push({
        title: 'Preferências',
        icon: SettingsIcon,
        sublinks: [
          {
            title: 'Perfil',
            icon: PersonIcon,
            path: '/user/profile',
          },
        ]
      });
    if (this.props.authState.user.info.permission === 'general-manager') {
      this.links.push({
        title: 'Combustíveis',
        path: '/company/fuel_list',
        icon: LocalGasStationIcon,
      });
    }

    if (this.props.authState.user.info.permission === 'vital-admin') {
      this.links.push({
        title: 'Usuarios',
        icon: PersonIcon,
        sublinks: [
          {
            title: 'Novo usuário',
            path: '/user/create',
            icon: AddIcon,
          },
          {
            title: 'Listar usuários',
            path: '/user/list',
            icon: ListIcon,
          },
        ],
      });
      this.links.push({
        title: 'Empresas',
        icon: PersonIcon,
        sublinks: [
          {
            title: 'Nova empresa',
            path: '/company/create',
            icon: AddIcon,
          },
          {
            title: 'Listar empresas',
            path: '/company/all',
            icon: ListIcon,
          },
        ],
      });
    }
    if (this.props.authState.user.info.permission === 'general-manager') {
      this.links.push({
        title: 'Funcionários',
        icon: PersonIcon,
        sublinks: [
          {
            title: 'Novo funcionário',
            path: '/user/create',
            icon: AddIcon,
          },
          {
            title: 'Listar funcionário',
            path: '/user/list',
            icon: ListIcon,
          },
        ],
      });
    }
  }
  render() {
    const {signedIn, user} = this.props.authState;
    return (
      <div>
        {
          signedIn &&
            <div>
              <Hidden smDown>
                <DesktopNav links={this.links} user={user.info}/>
              </Hidden>
              <Hidden mdUp>
                <MobileNav links={this.links} user={user.info}/>
              </Hidden>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps)(Navbar);
