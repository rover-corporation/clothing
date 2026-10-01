import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksFeature extends Struct.ComponentSchema {
  collectionName: 'components_blocks_features';
  info: {
    displayName: 'Feature';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sections';
  info: {
    displayName: 'Section';
  };
  attributes: {
    content: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedDeveloper extends Struct.ComponentSchema {
  collectionName: 'components_shared_developers';
  info: {
    displayName: 'developer';
  };
  attributes: {
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    displayName: 'FaqItem';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface SharedFeatTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_feat_tags';
  info: {
    displayName: 'featTag';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface SharedFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_links';
  info: {
    displayName: 'FooterLink';
  };
  attributes: {
    label: Schema.Attribute.String;
    path: Schema.Attribute.String;
  };
}

export interface SharedShowcaseItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_showcase_items';
  info: {
    displayName: 'ShowcaseItem';
  };
  attributes: {
    badge: Schema.Attribute.Enumeration<['NEW', 'HIT', 'SALE']>;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'shared.feat-tag', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps';
  info: {
    displayName: 'step';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    displayName: 'Tag';
  };
  attributes: {
    value: Schema.Attribute.String;
  };
}

export interface UiButton extends Struct.ComponentSchema {
  collectionName: 'components_ui_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    label: Schema.Attribute.String;
    to: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary']>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'blocks.feature': BlocksFeature;
      'blocks.section': BlocksSection;
      'shared.developer': SharedDeveloper;
      'shared.faq-item': SharedFaqItem;
      'shared.feat-tag': SharedFeatTag;
      'shared.footer-link': SharedFooterLink;
      'shared.showcase-item': SharedShowcaseItem;
      'shared.step': SharedStep;
      'shared.tag': SharedTag;
      'ui.button': UiButton;
    }
  }
}
