FROM jboss/keycloak:6.0.1

# Initial account credentials
ENV KEYCLOAK_USER admin
ENV KEYCLOAK_PASSWORD Password1

# Set to true for running behind Heroku's load balancers
ENV PROXY_ADDRESS_FORWARDING true

RUN mkdir -p /opt/jboss/tools
RUN mkdir -p /opt/jboss/keycloak/themes/example_app

COPY docker-entrypoint.sh /opt/jboss/tools
COPY themes/example_app /opt/jboss/keycloak/themes/example_app

ADD ./config /config/

ENTRYPOINT [ "/opt/jboss/tools/docker-entrypoint.sh" ]

CMD ["-b", "0.0.0.0", "-Dkeycloak.migration.action=import", "-Dkeycloak.migration.provider=dir", "-Dkeycloak.migration.dir=/config/", "-Dkeycloak.migration.strategy=IGNORE_EXISTING" ]
