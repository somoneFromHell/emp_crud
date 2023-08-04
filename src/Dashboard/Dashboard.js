import React from 'react';
import { Container, Header, Grid, Segment } from 'semantic-ui-react';

const Dashboard = () => {
  return (
    <Container>
      <Header as="h1">Employee Dashboard</Header>
      <Grid columns={3} stackable>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment color="blue">
              <Header as="h3">Employee Count</Header>
              <p>Total number of employees: 100</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="green">
              <Header as="h3">current projects</Header>
              <p>Total: 30</p>
              <p>Completed: 5</p>
              <p>pending: 5</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="orange">
              <Header as="h3">Top Department</Header>
              <p>Top department: IT</p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column width={16}>
            <Segment color="teal">
              <Header as="h3">Employee List</Header>
              <ul>
                <li>John Doe - Software Engineer - $80,000</li>
                <li>Jane Smith - UX Designer - $70,000</li>
                <li>Michael Johnson - Data Scientist - $90,000</li>
                <li>Sarah Lee - Product Manager - $100,000</li>
                {/* Add more employees as needed */}
              </ul>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Dashboard;
