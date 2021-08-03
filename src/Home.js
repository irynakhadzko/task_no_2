import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { CustomInput, Input, Submit } from 'formstrap';
import { Card, Label, FormGroup } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { CountryCodes } from './CountryCodes';
import { LanguageCodes } from './LanguageCodes';
import { CurrencyCodes } from './CurrencyCodes';
import {CopyToClipboard} from 'react-copy-to-clipboard';


const gameCategory = [
  {"code": "poker", "description": "Poker"},
  {"code": "top_games", "description": "Top Games"},
  {"code": "roulette", "description": "Roulette"},
  {"code": "blackjack", "description": "Blackjack"},
  {"code": "reward_games", "description": "Reward Games"},
];


export const Home = props => {
  const [url, setUrl] = useState("https://{hostname}/ua/v1/{casino.key}/{api.token}");
  const [parameters, setParameters] = useState({});
  const [clipboard, setClipboard] = useState({
    value: 'empty',
    copied: false
  });

  const initialValues = {
    url_parameters: {
      hostname: "live.bestcasino.com",
      casino_key: "b00001",
      api_token: "cccwww",
    },
    uuid: uuidv4(),
    config: {
      game: {
        category: "blackjack",
        // table: {
        //   id: "vip-blackjack-123"
        // }
      }
    },
    player: {
      id: "20150217abcd",
      country: "UK",
      currency: "USD",
      nickname: "abcd20150217",
      language: "es",
      session: {
        id: "111ssss3333rrrrr45555",
        ip: "192.168.0.1",
      },
    },
  };

  const onSubmit = async (values, { setSubmitting }) => {
    let urlParameters = { ...values.url_parameters};
    let newParameters = { ...parameters};
    newParameters.uuid = values.uuid;
    newParameters.player = { ...parameters.player, ...values.player};
    newParameters.config = { ...parameters.config, ...values.config};
    if (values.player.update && values.player.update === "1") {
      newParameters.player.update = true;
    } else {
      newParameters.player.update = false;
    }
    if (values.config.freeGames && values.config.freeGames === "1") {
      newParameters.config.freeGames = true;
    } else {
      if (values.config.freeGames !== undefined) {
        newParameters.config.freeGames = false;
      }
    }
    setParameters(newParameters);
    const newUrl = `https://${urlParameters.hostname}/ua/v1/${urlParameters.casino_key}/${urlParameters.api_token}`;
    setUrl(newUrl);
    setClipboard({
      value: `
URL:
${newUrl}

Parameters:
${JSON.stringify(newParameters, null, 2)}

`
    })
    setSubmitting(false);
  };

  const handleChange = event => {
    console.log("e: ", event);
  };

  return (
    <Container>
      <Row xs="12" sm="6" md="6">
        <Col sm="6">
          <Card>
            <Formik initialValues={initialValues} onSubmit={onSubmit} >
              <Form>
                <Submit withSpinner>Generate</Submit>
                URL Parameters
                <FormGroup>
                  <Label>Hostname</Label>
                  <Input type="text" name="url_parameters.hostname" onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <Label>Casino Key</Label>
                  <Input type="text" name="url_parameters.casino_key" />
                </FormGroup>
                <FormGroup>
                  <Label>API Token</Label>
                  <Input type="text" name="url_parameters.api_token" />
                </FormGroup>
                <FormGroup>
                  <Label>UUID</Label>
                  <Input type="text" name="uuid" />
                </FormGroup>
                Player
                <FormGroup>
                  <Label>ID</Label>
                  <Input type="text" name="player.id" />
                </FormGroup>
                <FormGroup>
                  <CustomInput
                    type="switch"
                    name="player.update"
                    label="Update"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input type="text" name="player.firstName" />
                </FormGroup>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input type="text" name="player.lastName" />
                </FormGroup>
                <FormGroup>
                  <Label>Nickname</Label>
                  <Input type="text" name="player.nickname" />
                </FormGroup>
                <FormGroup>
                  <Label>Country</Label>
                  <CustomInput type="select" name="player.country" >
                    {CountryCodes && CountryCodes.map(({code, description}, index) => (
                      <option key={index} value={code}>{description}</option>
                    ))}
                  </CustomInput>
                </FormGroup>
                <FormGroup>
                  <Label>Language</Label>
                  <CustomInput type="select" name="player.language" >
                    {LanguageCodes && LanguageCodes.map(({code, description}, index) => (
                      <option key={index} value={code}>{description}</option>
                    ))}
                  </CustomInput>
                </FormGroup>
                <FormGroup>
                  <Label>Currency</Label>
                  <CustomInput type="select" name="player.currency" >
                    {CurrencyCodes && CurrencyCodes.map(({code, description}, index) => (
                      <option key={index} value={code}>{description}</option>
                    ))}
                  </CustomInput>
                </FormGroup>
                Session
                <FormGroup>
                  <Label>ID</Label>
                  <Input type="text" name="player.session.id" />
                </FormGroup>
                <FormGroup>
                  <Label>IP</Label>
                  <Input type="text" name="player.session.ip" />
                </FormGroup>
                Config
                Game
                <FormGroup>
                  <Label>Category</Label>
                  <CustomInput type="select" name="config.game.category" >
                    {gameCategory && gameCategory.map(({code, description}, index) => (
                      <option key={index} value={code}>{description}</option>
                    ))}
                  </CustomInput>
                </FormGroup>
                <FormGroup>
                  <Label>Table ID</Label>
                  <Input type="text" name="config.game.table.id" />
                </FormGroup>
                Config
                Urls
                <FormGroup>
                  <Label>Cashier</Label>
                  <Input type="text" name="config.urls.cashier" />
                </FormGroup>
                <FormGroup>
                  <Label>responsibleGaming</Label>
                  <Input type="text" name="config.urls.responsibleGaming" />
                </FormGroup>
                <FormGroup>
                  <CustomInput
                    type="switch"
                    name="config.freeGames"
                    label="Free Games"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Form>
            </Formik>
          </Card>
        </Col>
        <Col sm="6">
          <br/>
          <CopyToClipboard text={clipboard.value}
            onCopy={() => setClipboard({copied: true})}>
            <button>Copy to clipboard</button>
          </CopyToClipboard>

          {clipboard.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
          <br/>
          <br/>
          <p>
            <b>URL:</b>
            {url}
          </p>
          <p>
            <b>Parameters:</b>
          </p>
          <pre>{JSON.stringify(parameters, null, 2)}</pre>
        </Col>
      </Row>
    </Container>
  );
};
