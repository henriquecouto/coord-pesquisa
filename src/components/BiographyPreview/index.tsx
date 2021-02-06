import {
  Avatar,
  Divider,
  Grid,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import Biography from "../../entities/Biography";
import { ReactComponent as MailIcon } from "../../assets/icons/mail.svg";
import { ReactComponent as ResearchGateIcon } from "../../assets/icons/researchgate.svg";
import { ReactComponent as OrcidIcon } from "../../assets/icons/orcid.svg";

const useStyles = makeStyles((theme: Theme) => ({
  picture: {
    width: 160,
    height: 160,
    borderRadius: 200,
  },
  divider: {
    height: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(2, 0),
  },
  icon: {
    padding: theme.spacing(0.6),
    borderRadius: "100%",
    borderColor: theme.palette.primary.main,
    borderWidth: theme.spacing(0.4),
    borderStyle: "solid",
    height: 50,
    width: 50,
    objectFit: "cover",
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

interface BiographyPreviewProps {
  biography: Biography;
}

const BiographyPreview: React.FC<BiographyPreviewProps> = ({ biography }) => {
  const classes = useStyles();

  return (
    <>
      <Divider className={classes.divider} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <Avatar
                src={biography.personalData.picture}
                className={classes.picture}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {biography.personalData.fullName}
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid
              item
              container
              alignItems="center"
              direction="column"
              component={Link}
              href={`mailto:${biography.personalData.email}`}
            >
              <MailIcon className={classes.icon} />
              {biography.personalData.email}
            </Grid>
            {biography.academicData.researchGate && (
              <Grid
                item
                container
                alignItems="center"
                direction="column"
                component={Link}
                href={biography.academicData.researchGate}
                target="_blank"
              >
                <ResearchGateIcon className={classes.icon} />
                ResearchGate
              </Grid>
            )}
            {biography.academicData.orcid && (
              <Grid
                item
                container
                alignItems="center"
                direction="column"
                component={Link}
                href={biography.academicData.orcid}
                target="_blank"
              >
                <OrcidIcon className={classes.icon} />
                ORCID
              </Grid>
            )}
          </Grid>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h4">BIOGRAFIA</Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">RESUMO</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {biography.academicData.resume}
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">FORMAÇÃO ACADÊMICA</Typography>
            </Grid>
            {biography.academicData.education?.map((item, index) => (
              <Grid item key={index + item.value}>
                <Typography variant="body1">{item.value}</Typography>
              </Grid>
            ))}
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">PUBLICAÇÕES RECENTES</Typography>
            </Grid>
            {biography.academicData.publications?.map((item, index) => (
              <Grid item key={index + item.value}>
                <Typography variant="body1">{item.value}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BiographyPreview;
