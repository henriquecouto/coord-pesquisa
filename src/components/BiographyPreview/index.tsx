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
  root: {
    margin: theme.spacing(3),
  },
  picture: {
    width: 160,
    height: 160,
    borderRadius: 200,
  },
  divider: {
    height: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(1, 0),
    "&:first-child": {
      marginTop: theme.spacing(0.3),
    },
    "&:last-child": {
      marginBottom: theme.spacing(0.3),
    },
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
  setContent: React.Dispatch<React.SetStateAction<Element | null>>;
}

const BiographyPreview: React.FC<BiographyPreviewProps> = ({
  biography,
  setContent,
}) => {
  const classes = useStyles();

  return (
    <div ref={(ref) => setContent(ref)} className={classes.root}>
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
              <Typography variant="h5">BIOGRAFIA</Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h6">RESUMO</Typography>
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
              <Typography variant="h6">FORMAÇÃO ACADÊMICA</Typography>
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
              <Typography variant="h6">PUBLICAÇÕES RECENTES</Typography>
            </Grid>
            {biography.academicData.publications?.map((item, index) => (
              <Grid item key={index + item.value}>
                <Typography variant="body1">{item.value}</Typography>
              </Grid>
            ))}
          </Grid>
          <Divider className={classes.divider} />
        </Grid>
      </Grid>
    </div>
  );
};

export default BiographyPreview;
