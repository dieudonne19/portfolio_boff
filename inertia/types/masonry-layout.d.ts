declare module "masonry-layout" {
  export default class Masonry {
    constructor(
      element: Element,
      options?: {
        itemSelector?: string;
        percentPosition?: boolean;
        horizontalOrder?: boolean;
        transitionDuration?: number;
      },
    );

    layout(): void;
    destroy(): void;
  }
}
