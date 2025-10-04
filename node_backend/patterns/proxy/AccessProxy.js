export default function createAccessProxy(targetService, { getActor = () => ({ role: "guest" }) } = {}) {
  return new Proxy(targetService, {
    get: function (obj, prop) {
      const orig = obj[prop];
      if (typeof orig !== "function") return orig;

      return function (...args) {
        const maybeMeta = args.length ? args[args.length - 1] : null;
        let actor = getActor();

        if (maybeMeta && typeof maybeMeta === "object" && maybeMeta.actor) {
          actor = maybeMeta.actor;
        }

        const requiredRole = orig.requiredRole || null;
        if (requiredRole && actor.role !== requiredRole) {
          const err = new Error("Access denied: insufficient role");
          err.status = 403;
          throw err;
        }

        const requiredPermissions = orig.requiredPermissions || null;
        if (
          requiredPermissions &&
          (!actor.permissions || !requiredPermissions.every(p => actor.permissions.includes(p)))
        ) {
          const err = new Error("Access denied: missing permissions");
          err.status = 403;
          throw err;
        }

        return orig.apply(obj, args);
      };
    },
  });
}
