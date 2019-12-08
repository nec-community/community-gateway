import React, { Component } from 'react';
import styled from 'styled-components'
import Terms from './Terms'

const Header = styled.div`
  background: $color2;
  padding: 5px 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.p`
  color: white;
  overflow: hidden;
  text-transform: uppercase;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  margin: 20px 20px 0px;
  display: inline;
`

const CloseIcon = styled.p`
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 24px;
  display: inline;
  margin: 20px 20px 0px;
`

const AcceptTerms = styled.button`
  background-color: #4800FF;
  color: white;
  text-transform: uppercase;
  font-size: 20px;
  display: float;
  margin: 20px 20px 20px auto;
  border: 0;
`

const ModalBody = styled.div`
  background: #00000080;
  padding: 12px;
  display: flex;
  height: 300px;
  overflow-y: scroll;
  margin: 5px 20px;
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Body = styled.div`
  width: ${props => { return props.width || 300 }}px;
  z-index: 9999;
  background: #101326;
  box-shadow: 0 0 64px #000000;
  padding: ${props => props.padding};
  background: ${props => props.theme.componentBackground};
  font-size: 13px;
`

class ModalHeader extends Component {
  static defaultProps = {
    title: false,
    handleClose: () => {}
  }

  render () {
    const {
      title,
      handleClose
    } = this.props
    console.log(handleClose)
    return (
      <Header>
        <Title>{title}</Title>
        <CloseIcon onClick={handleClose}>X</CloseIcon>
      </Header>
    )
  }
}

class Modal extends Component {
  static defaultProps = {
    modalOpen: false
  }

  render () {
    const {
      modalOpen,
      children,
      padding = '15px'
    } = this.props

    if (!modalOpen) { return null }

    return (
      <Backdrop>
        <Body padding={padding} width={this.props.width}>
        {children}
        </Body>
      </Backdrop>
    )
  }
}

export default class TermsModal extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {isOpen, handleClose} = this.props

    return (
      <Modal modalOpen={isOpen} padding={0} width={926}>
        <ModalHeader title={'Participation Agreement'} handleClose={handleClose} />
        <ModalBody>
          <Terms/>
        </ModalBody>
        <AcceptTerms onClick={handleClose}>Confirm</AcceptTerms>
      </Modal>
    )
  }
}
